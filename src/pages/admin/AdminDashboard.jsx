// =============================================================================
// Admin Dashboard - Project & Photo Management
// =============================================================================

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
    getProjects,
    createProject,
    updateProject,
    deleteProject,
    uploadPhoto,
    deletePhoto,
} from '../../services/api';
import Swal from 'sweetalert2';
import {
    LogOut,
    Plus,
    Trash2,
    Edit,
    Image,
    Upload,
    X,
    ChevronDown,
    ChevronUp,
    Home,
    Loader2,
} from 'lucide-react';

export default function AdminDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedProject, setExpandedProject] = useState(null);
    const fileInputRef = useRef(null);
    const [uploadingTo, setUploadingTo] = useState(null);
    const [uploadType, setUploadType] = useState('gallery');

    useEffect(() => {
        loadProjects();
    }, []);

    async function loadProjects() {
        try {
            const data = await getProjects();
            setProjects(data);
        } catch {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to load projects',
                confirmButtonColor: '#dc2626',
            });
        } finally {
            setLoading(false);
        }
    }

    async function handleLogout() {
        const result = await Swal.fire({
            title: 'Logout?',
            text: 'Are you sure you want to logout?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, logout',
        });

        if (result.isConfirmed) {
            logout();
            navigate('/admin');
        }
    }

    async function handleCreateProject() {
        const { value: formValues } = await Swal.fire({
            title: 'Create New Project',
            html: `
        <input id="swal-title" class="swal2-input" placeholder="Project Title" required>
        <input id="swal-location" class="swal2-input" placeholder="Location (e.g., Luverne, MN)">
        <textarea id="swal-description" class="swal2-textarea" placeholder="Description (optional)"></textarea>
      `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            confirmButtonText: 'Create',
            preConfirm: () => {
                const title = document.getElementById('swal-title').value;
                if (!title) {
                    Swal.showValidationMessage('Title is required');
                    return false;
                }
                return {
                    title,
                    location: document.getElementById('swal-location').value,
                    description: document.getElementById('swal-description').value,
                };
            },
        });

        if (formValues) {
            try {
                Swal.fire({
                    title: 'Creating...',
                    allowOutsideClick: false,
                    didOpen: () => Swal.showLoading(),
                });

                const data = await createProject(formValues);
                setProjects([...projects, data.project]);

                Swal.fire({
                    icon: 'success',
                    title: 'Created!',
                    text: 'Project created successfully',
                    timer: 1500,
                    showConfirmButton: false,
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message || 'Failed to create project',
                    confirmButtonColor: '#dc2626',
                });
            }
        }
    }

    async function handleEditProject(project) {
        const { value: formValues } = await Swal.fire({
            title: 'Edit Project',
            html: `
        <input id="swal-title" class="swal2-input" placeholder="Project Title" value="${project.title}" required>
        <input id="swal-location" class="swal2-input" placeholder="Location" value="${project.location || ''}">
        <textarea id="swal-description" class="swal2-textarea" placeholder="Description">${project.description || ''}</textarea>
      `,
            focusConfirm: false,
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            confirmButtonText: 'Save',
            preConfirm: () => {
                const title = document.getElementById('swal-title').value;
                if (!title) {
                    Swal.showValidationMessage('Title is required');
                    return false;
                }
                return {
                    title,
                    location: document.getElementById('swal-location').value,
                    description: document.getElementById('swal-description').value,
                };
            },
        });

        if (formValues) {
            try {
                Swal.fire({
                    title: 'Saving...',
                    allowOutsideClick: false,
                    didOpen: () => Swal.showLoading(),
                });

                await updateProject(project.id, formValues);
                setProjects(projects.map(p =>
                    p.id === project.id ? { ...p, ...formValues } : p
                ));

                Swal.fire({
                    icon: 'success',
                    title: 'Saved!',
                    timer: 1500,
                    showConfirmButton: false,
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message,
                    confirmButtonColor: '#dc2626',
                });
            }
        }
    }

    async function handleDeleteProject(project) {
        const result = await Swal.fire({
            title: 'Delete Project?',
            html: `
        <p>Are you sure you want to delete "<strong>${project.title}</strong>"?</p>
        <p class="text-sm text-gray-500 mt-2">This will also delete all photos in this project.</p>
      `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            confirmButtonText: 'Yes, delete it',
        });

        if (result.isConfirmed) {
            try {
                Swal.fire({
                    title: 'Deleting...',
                    allowOutsideClick: false,
                    didOpen: () => Swal.showLoading(),
                });

                await deleteProject(project.id);
                setProjects(projects.filter(p => p.id !== project.id));

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    timer: 1500,
                    showConfirmButton: false,
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message,
                    confirmButtonColor: '#dc2626',
                });
            }
        }
    }

    function openFileUpload(projectId, type = 'gallery') {
        setUploadingTo(projectId);
        setUploadType(type);
        fileInputRef.current?.click();
    }

    async function handleFileUpload(e) {
        const files = e.target.files;
        if (!files?.length || !uploadingTo) return;

        const projectId = uploadingTo;
        const type = uploadType;

        // Reset input
        e.target.value = '';
        setUploadingTo(null);

        // Show upload progress
        Swal.fire({
            title: 'Uploading...',
            html: `<p>Uploading ${files.length} photo(s)</p>`,
            allowOutsideClick: false,
            didOpen: () => Swal.showLoading(),
        });

        try {
            const uploadPromises = Array.from(files).map(file =>
                uploadPhoto(projectId, file, type)
            );

            const results = await Promise.all(uploadPromises);

            // Update project with new photos
            setProjects(projects.map(p => {
                if (p.id !== projectId) return p;

                const updatedProject = { ...p };
                results.forEach(result => {
                    if (result.photo.type === 'before') {
                        updatedProject.beforePhoto = result.photo;
                    } else if (result.photo.type === 'after') {
                        updatedProject.afterPhoto = result.photo;
                    } else {
                        updatedProject.photos = [...(updatedProject.photos || []), result.photo];
                    }
                });
                return updatedProject;
            }));

            Swal.fire({
                icon: 'success',
                title: 'Uploaded!',
                text: `${files.length} photo(s) uploaded successfully`,
                timer: 1500,
                showConfirmButton: false,
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Upload Failed',
                text: error.message,
                confirmButtonColor: '#dc2626',
            });
        }
    }

    async function handleDeletePhoto(projectId, photo) {
        const result = await Swal.fire({
            title: 'Delete Photo?',
            imageUrl: photo.url,
            imageWidth: 200,
            imageAlt: 'Photo to delete',
            showCancelButton: true,
            confirmButtonColor: '#dc2626',
            confirmButtonText: 'Delete',
        });

        if (result.isConfirmed) {
            try {
                Swal.fire({
                    title: 'Deleting...',
                    allowOutsideClick: false,
                    didOpen: () => Swal.showLoading(),
                });

                await deletePhoto(projectId, photo.id);

                // Update project state
                setProjects(projects.map(p => {
                    if (p.id !== projectId) return p;

                    const updatedProject = { ...p };
                    if (p.beforePhoto?.id === photo.id) {
                        updatedProject.beforePhoto = null;
                    } else if (p.afterPhoto?.id === photo.id) {
                        updatedProject.afterPhoto = null;
                    } else {
                        updatedProject.photos = (p.photos || []).filter(ph => ph.id !== photo.id);
                    }
                    return updatedProject;
                }));

                Swal.fire({
                    icon: 'success',
                    title: 'Deleted!',
                    timer: 1500,
                    showConfirmButton: false,
                });
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: error.message,
                    confirmButtonColor: '#dc2626',
                });
            }
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-red-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                onChange={handleFileUpload}
                className="hidden"
            />

            {/* Header */}
            <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <h1 className="text-xl font-bold text-white">Padillas Concrete Admin</h1>
                        <span className="text-sm text-gray-400">Welcome, {user?.username}</span>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center text-gray-400 hover:text-white transition-colors"
                        >
                            <Home className="w-5 h-5 mr-1" />
                            View Site
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center text-gray-400 hover:text-red-500 transition-colors"
                        >
                            <LogOut className="w-5 h-5 mr-1" />
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* Actions Bar */}
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-white">Gallery Projects</h2>
                    <button
                        onClick={handleCreateProject}
                        className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                    >
                        <Plus className="w-5 h-5 mr-2" />
                        New Project
                    </button>
                </div>

                {/* Projects List */}
                {projects.length === 0 ? (
                    <div className="text-center py-16">
                        <Image className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400 text-lg">No projects yet</p>
                        <p className="text-gray-500 mt-2">Create your first project to start adding photos</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {projects.map(project => (
                            <div
                                key={project.id}
                                className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
                            >
                                {/* Project Header */}
                                <div
                                    className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-750"
                                    onClick={() => setExpandedProject(
                                        expandedProject === project.id ? null : project.id
                                    )}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden">
                                            {project.beforePhoto || project.afterPhoto || project.photos?.[0] ? (
                                                <img
                                                    src={(project.beforePhoto || project.afterPhoto || project.photos[0]).url}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <Image className="w-6 h-6 text-gray-500" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold">{project.title}</h3>
                                            <p className="text-gray-400 text-sm">
                                                {project.location || 'No location'} • {(project.photos?.length || 0) + (project.beforePhoto ? 1 : 0) + (project.afterPhoto ? 1 : 0)} photos
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleEditProject(project); }}
                                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-colors"
                                        >
                                            <Edit className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDeleteProject(project); }}
                                            className="p-2 text-gray-400 hover:text-red-500 hover:bg-gray-700 rounded-lg transition-colors"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                        {expandedProject === project.id ? (
                                            <ChevronUp className="w-5 h-5 text-gray-400" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                </div>

                                {/* Expanded Content */}
                                {expandedProject === project.id && (
                                    <div className="border-t border-gray-700 p-4">
                                        {/* Before/After Section */}
                                        <div className="mb-6">
                                            <h4 className="text-white font-medium mb-3">Before & After</h4>
                                            <div className="grid grid-cols-2 gap-4">
                                                {/* Before Photo */}
                                                <div className="relative">
                                                    <p className="text-gray-400 text-sm mb-2">Before</p>
                                                    {project.beforePhoto ? (
                                                        <div className="relative group">
                                                            <img
                                                                src={project.beforePhoto.url}
                                                                alt="Before"
                                                                className="w-full h-32 object-cover rounded-lg"
                                                            />
                                                            <button
                                                                onClick={() => handleDeletePhoto(project.id, project.beforePhoto)}
                                                                className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => openFileUpload(project.id, 'before')}
                                                            className="w-full h-32 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-gray-400 transition-colors"
                                                        >
                                                            <Upload className="w-6 h-6 mb-1" />
                                                            <span className="text-sm">Upload Before</span>
                                                        </button>
                                                    )}
                                                </div>

                                                {/* After Photo */}
                                                <div className="relative">
                                                    <p className="text-gray-400 text-sm mb-2">After</p>
                                                    {project.afterPhoto ? (
                                                        <div className="relative group">
                                                            <img
                                                                src={project.afterPhoto.url}
                                                                alt="After"
                                                                className="w-full h-32 object-cover rounded-lg"
                                                            />
                                                            <button
                                                                onClick={() => handleDeletePhoto(project.id, project.afterPhoto)}
                                                                className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => openFileUpload(project.id, 'after')}
                                                            className="w-full h-32 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:text-white hover:border-gray-400 transition-colors"
                                                        >
                                                            <Upload className="w-6 h-6 mb-1" />
                                                            <span className="text-sm">Upload After</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Gallery Photos Section */}
                                        <div>
                                            <div className="flex items-center justify-between mb-3">
                                                <h4 className="text-white font-medium">Gallery Photos</h4>
                                                <button
                                                    onClick={() => openFileUpload(project.id, 'gallery')}
                                                    className="flex items-center text-sm text-red-500 hover:text-red-400 transition-colors"
                                                >
                                                    <Plus className="w-4 h-4 mr-1" />
                                                    Add Photos
                                                </button>
                                            </div>

                                            {project.photos?.length > 0 ? (
                                                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                                                    {project.photos.map(photo => (
                                                        <div key={photo.id} className="relative group">
                                                            <img
                                                                src={photo.url}
                                                                alt="Gallery"
                                                                className="w-full h-20 object-cover rounded-lg"
                                                            />
                                                            <button
                                                                onClick={() => handleDeletePhoto(project.id, photo)}
                                                                className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"
                                                            >
                                                                <X className="w-3 h-3" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <p className="text-gray-500 text-sm text-center py-4">
                                                    No gallery photos yet. Click "Add Photos" to upload.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

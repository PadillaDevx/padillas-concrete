/**
 * Admin Header Component
 */
import { useNavigate } from 'react-router-dom';
import { LogOut, Home, Key, UserPlus, Settings, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function AdminHeader({ user, isAdmin, onLogout, onChangeCredentials, onCreateUser }) {
    const navigate = useNavigate();
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <h1 className="text-xl font-bold text-white">Padillas Concrete Admin</h1>

                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center text-gray-400 hover:text-white transition-colors"
                    >
                        <Home className="w-5 h-5 mr-1" />
                        View Site
                    </button>

                    {/* User Dropdown */}
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setShowMenu(!showMenu)}
                            className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white transition-colors"
                        >
                            <Settings className="w-5 h-5" />
                            <span>{user?.username}</span>
                            <span className="px-2 py-0.5 bg-gray-600 rounded text-xs">
                                {isAdmin ? 'Admin' : 'User'}
                            </span>
                            <ChevronDown className={`w-4 h-4 transition-transform ${showMenu ? 'rotate-180' : ''}`} />
                        </button>

                        {showMenu && (
                            <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-2 z-50">
                                <button
                                    onClick={() => { setShowMenu(false); onChangeCredentials(); }}
                                    className="w-full flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                                >
                                    <Key className="w-4 h-4 mr-3" />
                                    Change Credentials
                                </button>

                                {isAdmin && (
                                    <button
                                        onClick={() => { setShowMenu(false); onCreateUser(); }}
                                        className="w-full flex items-center px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                                    >
                                        <UserPlus className="w-4 h-4 mr-3" />
                                        Create User
                                    </button>
                                )}

                                <div className="border-t border-gray-700 my-2" />

                                <button
                                    onClick={() => { setShowMenu(false); onLogout(); }}
                                    className="w-full flex items-center px-4 py-2 text-red-400 hover:bg-gray-700 hover:text-red-300 transition-colors"
                                >
                                    <LogOut className="w-4 h-4 mr-3" />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}

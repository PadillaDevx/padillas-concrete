export const BASE_URL = import.meta.env.BASE_URL;

export const scrollToId = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

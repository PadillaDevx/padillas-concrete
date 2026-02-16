import { useTranslation } from 'react-i18next';

export default function SectionHeader({ titleKey, subtitleKey }) {
    const { t } = useTranslation();

    return (
        <div className="text-center mb-16 glass-card rounded-3xl p-8 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 text-shadow-strong">
                {t(titleKey)}
            </h2>
            {subtitleKey && (
                <p className="text-xl text-white text-shadow">
                    {t(subtitleKey)}
                </p>
            )}
        </div>
    );
}

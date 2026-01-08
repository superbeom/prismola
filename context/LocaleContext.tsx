'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Locale } from '@/types';

interface LocaleContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    isAutoDetected: boolean;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({
    children,
    initialLocale
}: {
    children: React.ReactNode;
    initialLocale: Locale;
}) {
    // 1. Initial state MUST match server-side HTML to avoid hydration error
    const [locale, setLocaleState] = useState<Locale>(initialLocale);
    const [isAutoDetected, setIsAutoDetected] = useState(true);

    // 2. Synchronize with localStorage only after mounting
    useEffect(() => {
        const savedLocale = localStorage.getItem('prismola-locale') as Locale;
        if (savedLocale && ['en', 'ko', 'ja', 'es'].includes(savedLocale) && savedLocale !== locale) {
            setLocaleState(savedLocale);
            setIsAutoDetected(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        setIsAutoDetected(false);
        // Save to cookie and localStorage
        document.cookie = `prismola-locale=${newLocale}; path=/; max-age=31536000`;
        localStorage.setItem('prismola-locale', newLocale);
    };

    return (
        <LocaleContext.Provider value={{ locale, setLocale, isAutoDetected }}>
            {children}
        </LocaleContext.Provider>
    );
}


export function useLocale() {
    const context = useContext(LocaleContext);
    if (context === undefined) {
        throw new Error('useLocale must be used within a LocaleProvider');
    }
    return context;
}

import { useLocale } from "@/context/LocaleContext";
import { en } from "@/i18n/en";

const dictionaries = {
    en,
    ko: en, // 추후 한국어 사전 추가 시 교체
    ja: en, // 추후 일본어 사전 추가 시 교체
    es: en, // 추후 스페인어 사전 추가 시 교체
};

export const useDictionary = () => {
    const { locale } = useLocale();
    return dictionaries[locale] || en;
};

import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
// types

export type Locale = (typeof locales)[number];

interface LocaleInfo {
	name: string;
	icon: string
}

// Can be imported from a shared config
export const locales = ['en', 'de', 'ru'];

export const localeNames: Record<Locale, LocaleInfo> = {
	en: {
		name: 'English',
		icon: 'united-kingdom-flag-icon.png',
	},
	de: {
		name: 'German',
		icon: 'germany-flag-icon.png',
	},
	ru: {
		name: 'Russian',
		icon: 'russia-flag-icon.png',
	},
};


export default getRequestConfig(async ({ locale }) => {
	// Validate that the incoming `locale` parameter is valid
	if (!locales.includes(locale as any)) notFound();

	return {
		messages: (await import(`../messages/${locale}.json`)).default
	};
});
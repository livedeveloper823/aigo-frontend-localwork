'use client';

// import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { localeNames, locales } from '../../i18n';
import { Link, usePathname } from '../../navigation';
import { GlobeIcon } from 'lucide-react';
import Image from 'next/image';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const LanguageSwitcher = () => {
	const pathName = usePathname();
	const searchParams = useSearchParams();
	// const isDesktop = useIsDesktop();

	// useEffect(() => {
	// 	if (isDesktop === false) {
	// 		window.scrollTo({
	// 			top: 92,
	// 			behavior: 'smooth',
	// 		});
	// 	}
	// }, [isDesktop]);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<GlobeIcon className="text-gray-800 xl:m-2 m-1 lg:w-8 w-5" />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				{locales.map((locale) => {
					return (
						<div key={locale}>
							<DropdownMenuItem>
								<Link locale={locale} href={`${pathName}?${searchParams}`} className={`flex rounded-sm`}>
									<span className="mr-2 overflow-hidden rounded">
										<Image src={localeNames[locale].icon} alt="" width={30} height={30} /></span>
									{localeNames[locale].name}
								</Link>
							</DropdownMenuItem>
						</div>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

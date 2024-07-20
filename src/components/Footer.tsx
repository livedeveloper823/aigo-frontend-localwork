
import React from "react";
import { AppStoreIcon, FooterLogoIcon, GooglePlay } from "./icons/icons";
import { MailIcon } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Footer = () => {
    const t = useTranslations('Footer')
    return (
        <div className="xl:mx-36 xl:my-16 md:mx-14 md:my-8">
            <div className="sm:flex justify-between md:gap-28 px-10">
                <div className=" flex flex-col gap-8 justify-start text-start w-80">
                    <FooterLogoIcon />
                    <p className="text-sm text-white">Be Infinity LTD<br />Unit 1411, 14/Floor, Cosco Tower, 183<br /> Queen’s Road Central <br />Sheung Wan, Hong Kong</p>
                    <div className="flex gap-2">
                        <MailIcon className="text-white" />
                        <p className="text-white">support@be-infinity.com</p>
                    </div>
                </div>
                <div className="text-white ">
                    <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-8 xl:text-lg md:text-md text-sm">
                        <div className="flex flex-col gap-2 lg:w-56">
                            <p className="uppercase">{t('features')}</p>
                            <Link href="/cryptocurrencies/prices-all">{t('all-crypto-prices')}</Link>
                            <Link href="/">{t('all-crypto-marktes')}</Link>
                            <Link href="/">{t('all-crypto-guides')}</Link>
                            <Link href="/">Coins2Go {t('app')}</Link>
                            <Link href="/">Infinity {t('academy')}</Link>
                            <Link href="/">{t('backoffice')}</Link>
                        </div>
                        <div className="flex flex-col gap-2 lg:w-56">
                            <p className="uppercase">{t('resources')}</p>
                            <Link href="/">{t('overview')}</Link>
                            <Link href="/">{t('features')}</Link>
                            <Link href="/">{t('solutions')}</Link>
                            <Link href="/">{t('pricing')}</Link>
                            <Link href="/">{t('help-center')}</Link>
                            <Link href="/">{t('affiliate-program')} </Link>
                        </div>
                        <div className="flex flex-col gap-2 lg:w-56">
                            <p className="uppercase">{t('company')}</p>
                            <Link href="/">{t('sales-letter')}</Link>
                            <Link href="/">{t('privacy-policy')}</Link>
                            <Link href="/">{t('legal-letter')}</Link>
                            <Link href="/">{t('pricing-policy')}</Link>
                            <Link href="/">{t('compensation-plan')}</Link>
                        </div>
                        <div className="flex flex-col gap-3 lg:w-48 w-36">
                            <p>{t('get-the-app')}</p>
                            <div className="flex justify-start">
                                <div className="flex lg:w-48 w-36 items-center border-2 border-white rounded-xl px-3 py-1 cursor-pointer">
                                    <AppStoreIcon />
                                    <div>
                                        <p className="text-[8px]">{t('download-on-the')}</p>
                                        <p className="xl:text-lg lg:text-sm text-xs font-semibold">App Store</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-start">
                                <div className="flex lg:w-48 w-36 gap-2 items-center border-2 border-white rounded-xl px-3 py-1 cursor-pointer">
                                    <GooglePlay />
                                    <div>
                                        <p className="text-[8px] uppercase">{t('get-it-on')}</p>
                                        <p className="xl:text-lg lg:text-sm text-xs font-semibold">Google Play</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className="bg-description mt-16" />
            <div className="text-description sm:text-md text-xs flex justify-between mt-8">
                <p>&copy;2024 Be Infinity LTD. All rights reserved.</p>
                <div className="flex sm:gap-4 gap-2">
                    <Link href="/">Terms</Link>
                    <Link href="/">Privacy</Link>
                    <Link href="/">Cookies</Link>
                </div>
            </div>
        </div>
    )
}

export default Footer;
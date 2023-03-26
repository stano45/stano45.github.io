import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import LanguagePicker from './LanguagePicker';

export default function Navbar() {
  const { t } = useTranslation('navbar');
  return (
    <nav className="flex items-center justify-between flex-wrap bg-blue-700 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-4xl tracking-tight">Stanislav Kosorin</span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-2xl lg:flex-grow">
          <Link href="/about" passHref>
            <button className="block mt-4 lg:inline-block lg:mt-0 text-pink-200 hover:text-white mr-6">
              {t('about')}
            </button>
          </Link>
          <Link href="/blog" passHref>
            <button className="block mt-4 lg:inline-block lg:mt-0 text-pink-200 hover:text-white mr-6">
              {t('blog')}
            </button>
          </Link>
          <Link href="/cv" passHref>
            <button className="block mt-4 lg:inline-block lg:mt-0 text-pink-200 hover:text-white mr-6">
              {t('cv')}
            </button>
          </Link>
          <Link href="/contact" passHref>
            <button className="block mt-4 lg:inline-block lg:mt-0 text-pink-200 hover:text-white">
              {t('contact')}
            </button>
          </Link>
        </div>
        <div>
          <LanguagePicker />
        </div>
      </div>
    </nav>
  );
}

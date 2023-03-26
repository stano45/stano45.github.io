import { useTranslation } from 'next-export-i18n';
import { NextSeo } from 'next-seo';
import React from 'react';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <>
      <NextSeo title={t('contact.title')} description={t('contact.description')} />
      <div id="contact" className="w-full min-h-screen bg-black">
        <h1>Contact</h1>
        <p>This is the Contact section.</p>
      </div>
    </>
  );
}

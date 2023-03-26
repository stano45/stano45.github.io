import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function CV() {
  return (
    <div id="cv" className="w-full min-h-screen bg-black">
      <h1>Portfolio</h1>
      <p>This is the Portfolio section.</p>
    </div>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['navbar'])),
      // Will be passed to the page component as props
    },
  };
}

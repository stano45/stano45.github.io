import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';

export default function About() {
  return (
    <div id="about" className="w-full min-h-screen bg-black">
      <h1>About</h1>
      <p>This is the About section.</p>
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

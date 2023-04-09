import { useLanguageQuery, useTranslation } from 'next-export-i18n';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import React from 'react';

export default function About() {
  const { t } = useTranslation();
  const [query] = useLanguageQuery();

  return (
    <>
      <NextSeo title={t('about.title')} description={t('about.description')} />
      <div className=" mt-10 flex justify-center">
        <div className="max-w-4xl shadow-lg rounded-lg p-8">
          <h1 className="text-4xl font-bold mb-4 opacity-0 fade-in-first">Let me introduce myself.</h1>
          <div className="opacity-0 fade-in-second mt-10">
            <p className="text-lg leading-relaxed mb-4">
              My name is Stanislav Kosorin and I am a software engineer. I love building fun and innovative projects, no
              matter the tech stack or use case. I am currently nearing the end of my Bachelor’s Degree in Computer
              Science at the{' '}
              <Link href={{ pathname: 'https://www.tu.berlin/' }} passHref className="text-blue-500 underline">
                Technical University of Berlin
              </Link>
              .
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Apart from studying, I am helping{' '}
              <Link href={{ pathname: 'https://www.cresta.com/' }} passHref className="text-blue-500 underline">
                Cresta
              </Link>{' '}
              revolutionize contact centers, enabling agents to communicate with customers more effectively, meeting
              their needs quickly and precisely.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              You can check out more of what I’ve been up to on my{' '}
              <Link href={{ pathname: '/cv', query: query }} passHref className="text-blue-500 underline">
                interactive resume
              </Link>
              .
            </p>

            <p className="text-lg leading-relaxed mb-4">
              Apart from my passion for software engineering, I like to keep myself active and engaged. I've been
              exploring Brazilian Jiu Jitsu lately, and it's been an exciting journey. In addition, I enjoy spending
              time outdoors, running or taking refreshing walks.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              I also have a keen interest in learning languages, currently grappling with the melodious Swedish
              language. If you're a native Swedish speaker or also learning, feel free to reach out - I'd love to{' '}
              <Link href={{ pathname: '/contact', query: query }} passHref className="text-blue-500 underline">
                chat
              </Link>
              ! :)
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

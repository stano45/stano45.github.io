import React from 'react';
import './Period.module.css';
import Period, { PeriodProps } from './Period';
import { useTranslation } from 'next-export-i18n';

export default function InteractiveCV() {
  const { t } = useTranslation();
  const cvContent: PeriodProps[] = t('cv.content');
  console.log(cvContent);
  if (!cvContent) return null;
  return (
    <div className="opacity-0 fade-in-first lg:w-1/2 mt-10">
      {cvContent &&
        cvContent.map((period, index) => (
          <React.Fragment key={index}>
            <Period {...period} />
            {index < cvContent.length - 1 && <hr className="my-6 border-t border-gray-500" />}
          </React.Fragment>
        ))}
    </div>
  );
}

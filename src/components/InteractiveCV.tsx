/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { useTranslation } from 'next-export-i18n';
import React from 'react';

import './Period.module.css';
import { Period, PeriodProps } from './Period';

export function InteractiveCV(): JSX.Element {
  const { t } = useTranslation();
  const cvContent: PeriodProps[] = t('cv.content');
  return (
    <div className="opacity-0 fade-in-first lg:w-1/2 mt-10">
      {cvContent ? (
        cvContent.map((period, index) => (
          <React.Fragment key={index}>
            <Period {...period} />
            {index < cvContent.length - 1 && <hr className="my-6 border-t border-gray-500" />}
          </React.Fragment>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}

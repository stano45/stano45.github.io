import Image from 'next/image';
import { ReactNode } from 'react';

interface ImageWrapperProps {
  imagePath: string;
  description?: ReactNode | string;
}

export function ImageWrapper({ imagePath, description }: ImageWrapperProps): JSX.Element {
  return (
    <div className="flex flex-col justify-center items-center mb-8">
      <Image
        src={imagePath}
        alt={typeof description === 'string' ? description : 'alt'}
        className="w-full"
        width={1000}
        height={1000}
      />
      {description && <p className="text-sm text-gray-300 italic">{description}</p>}
    </div>
  );
}

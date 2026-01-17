
import React from 'react';

export interface ModuleDetail {
  title: string;
  texts: string[];
  images: {
    day: string[];
    night: string[];
  };
  videos?: string[];
  hotspotTarget?: string;
}

export type ModuleKey = 'jacuzzi' | 'cozinha' | 'casa' | 'wc' | 'pool' | 'parede' | 'mesa';

export interface InfoCardData {
  id: ModuleKey;
  video: string;
  title: string;
  description: string;
}

export interface SustainabilityItem {
  title: string;
  subtitle: string;
  details: string[];
  chartType: 'bar' | 'pie' | 'line';
}

// Fix: Augment the React namespace instead of using a global declare that can shadow standard HTML elements.
// This ensures that standard JSX tags like 'div', 'main', 'section', etc., remain available while adding support for 'model-viewer'.
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
        src?: string;
        'camera-controls'?: boolean;
        'auto-rotate'?: boolean;
        'camera-orbit'?: string;
        'camera-target'?: string;
        'min-camera-orbit'?: string;
        'max-camera-orbit'?: string;
        ar?: boolean;
        loading?: string;
        reveal?: string;
        'shadow-intensity'?: string;
        'environment-image'?: string;
        exposure?: string;
      }, HTMLElement>;
    }
  }
}

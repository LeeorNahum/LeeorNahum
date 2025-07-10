import React from 'react';
import Image from 'next/image';

interface IconProps extends React.ComponentProps<typeof Image> {
  alt: string;
}

const createIcon = (src: string, alt: string) => {
  const IconComponent: React.FC<Omit<IconProps, 'src' | 'alt'>> = (props) => (
    <Image src={`/icons/${src}`} alt={alt} width={24} height={24} {...props} />
  );
  IconComponent.displayName = `${alt.replace(/\s/g, '')}Icon`;
  return IconComponent;
};

export const ArduinoIcon = createIcon('Arduino.svg', 'Arduino');
export const AutoHotkeyIcon = createIcon('AutoHotkey.svg', 'AutoHotkey');
export const BlenderIcon = createIcon('Blender.svg', 'Blender');
export const CppIcon = createIcon('Cpp.svg', 'C++');
export const CursorIcon = createIcon('Cursor.svg', 'Cursor');
export const FigmaIcon = createIcon('Figma.svg', 'Figma');
export const Fusion360Icon = createIcon('Fusion360.svg', 'Fusion 360');
export const GitHubIcon = createIcon('GitHub.svg', 'GitHub');
export const GmailIcon = createIcon('Gmail.svg', 'Gmail');
export const HtmlIcon = createIcon('HTML.svg', 'HTML');
export const InstagramIcon = createIcon('Instagram.svg', 'Instagram');
export const IsometricsFitnessIcon = createIcon('Isometrics Fitness.png', 'Isometrics Fitness');
export const JavaIcon = createIcon('Java.svg', 'Java');
export const KiCadIcon = createIcon('KiCad.svg', 'KiCad');
export const LightModeIcon = createIcon('LightMode.svg', 'Light Mode');
export const DarkModeIcon = createIcon('DarkMode.svg', 'Dark Mode');
export const LinkedInIcon = createIcon('LinkedIn.svg', 'LinkedIn');
export const NotionIcon = createIcon('Notion.svg', 'Notion');
export const OpenIcon = createIcon('Open.svg', 'Open');
export const PlatformIOIcon = createIcon('PlatformIO.svg', 'PlatformIO');
export const PythonIcon = createIcon('Python.svg', 'Python');
export const ShareIcon = createIcon('Share.svg', 'Share');
export const TypeScriptIcon = createIcon('TypeScript.svg', 'TypeScript');
export const VSCodeIcon = createIcon('VSCode.svg', 'VS Code'); 
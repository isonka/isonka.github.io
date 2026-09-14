import { type FC, type ReactNode } from 'react';

type ManifestoLineProps = {
  children: ReactNode;
};

/** Single visible heading text — no dual ghost/fill copies. */
export const ManifestoLine: FC<ManifestoLineProps> = ({ children }) => (
  <span className="manifesto-block">{children}</span>
);

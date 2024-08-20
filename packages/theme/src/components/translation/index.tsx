

import { useTranslation } from 'react-i18next';
import { Fragment } from "react";
import React from 'react';


interface TranslationProps {
  id: string;
  defaultValue?: string;
}

export function Translation({ id, defaultValue }: TranslationProps) {
  const { t } = useTranslation();
  return (
    <Fragment>
      {t(id, defaultValue || '')}
    </Fragment>
  )
}

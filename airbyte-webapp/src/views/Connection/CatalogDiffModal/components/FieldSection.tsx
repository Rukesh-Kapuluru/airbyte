import { FormattedMessage, useIntl } from "react-intl";

import { StreamTransform } from "core/request/AirbyteClient";

import { DiffVerb } from "../types";
import { DiffAccordion } from "./DiffAccordion";
import { DiffHeader } from "./DiffHeader";
import styles from "./FieldSection.module.scss";

interface FieldSectionProps {
  streams: StreamTransform[];
  diffVerb: DiffVerb;
}

export const FieldSection: React.FC<FieldSectionProps> = ({ streams, diffVerb }) => {
  const { formatMessage } = useIntl();
  return (
    // eslint-disable-next-line css-modules/no-undef-class
    <div className={styles.sectionContainer}>
      {/* eslint-disable-next-line css-modules/no-undef-class */}
      <div className={styles.fieldHeader}>
        <DiffHeader diffCount={streams.length} diffVerb={diffVerb} diffType="stream" />
      </div>
      <div className={styles.fieldSubHeader}>
        <div id={formatMessage({ id: "connection.updateSchema.namespace" })}>
          <FormattedMessage id="connection.updateSchema.namespace" />
        </div>
        <div className={styles.padLeft} id={formatMessage({ id: "connection.updateSchema.streamName" })}>
          <FormattedMessage id="connection.updateSchema.streamName" />
        </div>
        <div />
      </div>
      <div className={styles.fieldRowsContainer}>
        {streams.length > 0 && (
          <ul>
            {streams.map((stream) => {
              return (
                <li key={`${stream.streamDescriptor.namespace}.${stream.streamDescriptor.name}`}>
                  <DiffAccordion streamTransform={stream} />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

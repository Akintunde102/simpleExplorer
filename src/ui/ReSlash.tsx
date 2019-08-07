import React from 'react';
import styles from './App.scss';

interface ReSlashProps {
    toSlash: string;
}

const ReSlash: React.SFC<ReSlashProps> = ({ toSlash }: ReSlashProps) => {
    const toSlashArray = toSlash.split('\\');
    return (
        <span>
            {toSlashArray.map((value, index) => (
                <span key={index}>
                    {value}
                    <span className={styles.newSlashes}> &gt;&gt; </span>
                </span>
            ))}
        </span>
    );
};

export default ReSlash;

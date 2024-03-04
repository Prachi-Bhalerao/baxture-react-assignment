import React, { useEffect, useState } from 'react';
import styles from './Avatar.module.css';

export const Avatar = ({ name }) => {
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const response = await fetch(`https://api.dicebear.com/7.x/initials/svg?seed=${name}`);
        const svgData = await response.text();
        console.log("avtar",svgData);
        setAvatarUrl(svgData);
      } catch (error) {
        console.error('Error fetching avatar:', error);
      }
    };

    fetchAvatar();
  }, [name]);

 return avatarUrl ? (
    <div
    className={styles.roundedAvatar} 
    dangerouslySetInnerHTML={{ __html: avatarUrl }}
  />
  ) : null;
};


 
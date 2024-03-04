"use client";
import React, { useEffect, useState } from 'react';
import { SimpleGrid, Card, Text, Container } from '@mantine/core';
import { IconUserPlus,IconUserMinus, IconTrash,IconPhone,IconMail,IconNetwork, IconStar } from '@tabler/icons-react';
import classes from './cards.module.css';
import { Avatar } from './Avatar';


export default function HomePage() {
  const [userData, setUserData] = useState<any[]>([]);
  const [followedUsers, setFollowedUsers] = useState<Set<number>>(new Set());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const toggleFollow = (userId: number) => {
    setFollowedUsers((prevFollowedUsers) => {
      const newFollowedUsers = new Set(prevFollowedUsers);
      if (newFollowedUsers.has(userId)) {
        newFollowedUsers.delete(userId);
      } else {
        newFollowedUsers.add(userId);
      }
      return newFollowedUsers;
    });
  };

  const deleteCard = (userId: number) => {
    setUserData((prevUserData) => prevUserData.filter((user) => user.id !== userId));
  };

  const cards = userData.map((user) => (
    <Card key={user.id}  radius="md" component="div" className={classes.card}>
      <div className={classes.avatarContainer}>
        <Avatar name={user.name} />
      </div>

       <Text className={classes.title} mt={5}>  
        {user.name}
        &nbsp;
        {followedUsers.has(user.id) && <IconStar size={18} />}
      </Text>

      <Text c="dimmed" size="md"  fw={400} mt={3} >
      <IconMail size={18} />
      &nbsp; 
        {user.email}
      </Text>

      <Text c="dimmed" size="md"  fw={400} mt={3}>
      <IconPhone size={18} />
      &nbsp; 
        {user.phone}
      </Text>

      <Text c="dimmed" size="md"  fw={400} mt={3}>
      <IconNetwork size={18} />
      &nbsp; 
      <a
        href={`http://${user.website}`}
        target="_blank"
        rel="noopener noreferrer"
        className={classes.websiteLink}
      >
        {user.website}
      </a>
      </Text>

      <div className={classes.buttonsContainer}>
      <button
          className={`${classes.subscribeButton} ${
            followedUsers.has(user.id) ? classes.followed : ''
          }`}
          onClick={() => toggleFollow(user.id)}
        >
          {followedUsers.has(user.id) ? (
            <>
              <IconUserMinus size={18} />
              &nbsp; Unfollow
            </>
          ) : (
            <>
              <IconUserPlus size={18} />
              &nbsp; Follow
            </>
          )}
        </button>
        
        <button className={classes.deleteButton}
              onClick={() => deleteCard(user.id)}
        >
        <IconTrash size={18} />
          &nbsp; 
          Delete</button>
      </div>
     
    </Card>
  ));

  return (
    <Container fluid className={classes.pageContainer}>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing={24}>
        {cards}
      </SimpleGrid>
    </Container>
  );
}



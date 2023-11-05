"use client";

import { useIterator } from "@/hooks/useIterator";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Heading,
  ScrollArea,
  Separator,
  Table,
  Text,
} from "@radix-ui/themes";
import React from "react";

type Props = {};

function Iterator({}: Props) {
  const { currentIndex, goToUser, isLoading, next, previous, users } =
    useIterator("https://randomuser.me/api/?results=10");
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className=''>
        <Flex justify='start' align='center'>
          <Text weight='bold'>Current Index</Text>
          <Badge className='mx-3'>{currentIndex}</Badge>
        </Flex>
        <Flex>
          <Heading size='4'>All Users</Heading>
          <Separator orientation='horizontal' />
        </Flex>
        <Card>
          <ScrollArea
            type='always'
            scrollbars='vertical'
            style={{ height: 400 }}>
            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Image</Table.ColumnHeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {users.length > 0 &&
                  users.map((user, index) => (
                    <Table.Row key={index}>
                      <Table.Cell>
                        {currentIndex === index && (
                          <Badge className='mx-3'>Current</Badge>
                        )}

                        {user.name}
                      </Table.Cell>
                      <Table.Cell>
                        <Flex justify='between'>
                          <Text mx='2'> Gender</Text>
                          <Badge
                            radius='full'
                            color={
                              user.gender === "female" ? "crimson" : "sky"
                            }>
                            {user.gender === "female" ? "♀" : "♂"}
                          </Badge>
                        </Flex>
                      </Table.Cell>
                      <Table.Cell>
                        <Avatar
                          src={user.picture}
                          alt={user.name}
                          fallback={user.name}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                <Table.Row>
                  {isLoading && <p className='text-red-500'>Loading...</p>}
                </Table.Row>
              </Table.Body>
            </Table.Root>
          </ScrollArea>
        </Card>

        <div className='space-x-4 my-2'>
          <Button onClick={() => previous()}>Previous</Button>
          <Button onClick={() => next()}>Next</Button>
        </div>
        <div className='space-x-4 my-2'>
          <Button onClick={() => goToUser(0)}>Go to first user</Button>
          <Button onClick={() => goToUser(users.length - 1)}>
            Go to last user
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Iterator;

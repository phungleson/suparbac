'use client';

import { Button } from 'flowbite-react';
import { useState, type FC } from 'react';
import {
  CLIENT_INSERT,
  CLIENT_UPSERT,
  FORBIDDEN,
  SERVER_INSERT,
  SERVER_UPSERT,
  SUCCESS,
  UNAUTHORIZED,
} from '@/helpers/constant';
import { insert, upsert } from '@/helpers/server/create';
import { createSupabaseClient } from '@/helpers/supabase/createSupabaseClient';
import { POSTS } from '@/helpers/supabase/tables';

const CreatePage: FC = () => {
  const [message, setMessage] = useState<string>();
  const supabase = createSupabaseClient();

  const setMessageFromResult = (result: { status: number }) => {
    if (result.status == 401) {
      setMessage(UNAUTHORIZED);
    } else if (result.status == 403) {
      setMessage(FORBIDDEN);
    } else {
      setMessage(SUCCESS);
    }
  };

  const onClientInsertClick = async () => {
    setMessage(undefined);
    const result = await supabase.from(POSTS).insert({ name: 'Name' }).returns();
    setMessageFromResult(result);
  };

  const onServerInsertClick = async () => {
    setMessage(undefined);
    const result = await insert();
    setMessageFromResult(result);
  };

  const onClientUpsertClick = async () => {
    setMessage(undefined);
    const result = await supabase.from(POSTS).upsert({ name: 'Name' }).returns();
    setMessageFromResult(result);
  };

  const onServerUpsertClick = async () => {
    setMessage(undefined);
    const result = await upsert();
    setMessageFromResult(result);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <div>{message}</div>
      <div className="flex gap-2">
        <Button onClick={onClientInsertClick}>{CLIENT_INSERT}</Button>
        <Button onClick={onServerInsertClick}>{SERVER_INSERT}</Button>
      </div>
      <div className="flex gap-2">
        <Button onClick={onClientUpsertClick}>{CLIENT_UPSERT}</Button>
        <Button onClick={onServerUpsertClick}>{SERVER_UPSERT}</Button>
      </div>{' '}
    </div>
  );
};

export default CreatePage;

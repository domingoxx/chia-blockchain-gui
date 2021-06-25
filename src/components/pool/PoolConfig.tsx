import React, { useEffect, useState } from 'react';
import { Trans } from '@lingui/macro';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import LayoutMain from '../layout/LayoutMain';
import usePlots from '../../hooks/usePlots';
import type { RootState } from '../../modules/rootReducer';
import { Button } from '@material-ui/core';
import { AdvancedOptions, ButtonSelected, CardStep,Form, Flex, TextField } from '@chia/core';
import { useDispatch } from 'react-redux';
import { Alert } from '@material-ui/lab';
import styled from 'styled-components';
import { setPoolConfig, getPoolConfig } from '../../modules/farmerMessages';

const StyledTextField = styled(TextField)`
  min-width: 640px;
`;

type FormData = {
  name: string;
  pool_key: string;
};
export default function PoolConfig() {
  const dispatch = useDispatch();
  const methods = useForm<FormData>({
    shouldUnregister: false,
    defaultValues: {
      name: '',
      pool_key: '',
    },
  });
  const [error, setError] = useState<Error | null>(null);
  const [pool_state, setPoolState] = useState<String | null>(null);
  async function handleSubmit(values: FormData) {
    const { name, pool_key } = values;
    setError(null);

    try {
      await dispatch(setPoolConfig(name, pool_key));
      setTimeout(getCurrentValues, 1000)
    } catch (error) {
      setError(error);
    }
  }

  async function getCurrentValues() {
    const { setValue } = methods;
    setError(null);

    try {
      const response = await dispatch(getPoolConfig());
      // @ts-ignore
      setValue('name', response.name || '');
      // @ts-ignore
      setValue('pool_key', response.pool_key || '');
      // @ts-ignore
      setPoolState(response.pool_state || '')
    } catch (error) {
      setError(error);
    }
  }

  async function reloadConfig() {
    getCurrentValues();
  }

  useEffect(() => {
    getCurrentValues();
  }, []); // eslint-disable-line

  return (
    <LayoutMain title={<Trans>Pool</Trans>}>
      <Form
        methods={methods}
        onSubmit={handleSubmit}
      >
        <Flex flexDirection="column" gap={3}>
          {error && (
            <Alert severity="error">{error.message}</Alert>
          )}
          {pool_state && (
            <Alert severity="info">{pool_state}</Alert>
          )}
          <StyledTextField
            label={<Trans>矿机名称</Trans>}
            name="name"
            variant="filled"
          />
          <StyledTextField
            label={<Trans>pool_key</Trans>}
            name="pool_key"
            variant="filled"
          />
          <Flex flexDirection="row" gap={3}>
            <Button color="primary" type="submit" variant="contained">
              <Trans>
                保存并启用
              </Trans>
            </Button>
            <Button onClick={reloadConfig} color="default" type="button" variant="contained">
              <Trans>
                刷新状态
              </Trans>
            </Button>
          </Flex>
        </Flex>
      </Form>
      
    </LayoutMain>
  );
}

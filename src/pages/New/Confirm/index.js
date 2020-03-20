import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { formatRelative, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Background from '~/components/Background';

import api from '~/services/api';

import { Container, Avatar, Name, Time, SubmitButton } from './styles';

export default function Confirm({ route, navigation }) {
  const { provider, time } = route.params;

  const dateFormatted = useMemo(
    () =>
      formatRelative(parseISO(time), new Date(), {
        locale: ptBR,
      }),
    [time]
  );

  async function handleAddAppointment() {
    await api.post('appointments', {
      provider_id: provider.id,
      date: time,
    });

    navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
  }
  console.tron.log(new Date());
  return (
    <Background>
      <Container>
        <Avatar
          source={{
            uri: provider.avatar
              ? provider.avatar.url
              : `http://api.adorable.io/avatar/50/${provider.name}.png`,
          }}
        />
        <Name>{provider.name}</Name>
        <Time>{dateFormatted}</Time>

        <SubmitButton onPress={() => handleAddAppointment()}>
          Confirmar Agendamento
        </SubmitButton>
      </Container>
    </Background>
  );
}

Confirm.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      time: PropTypes.string,
      provider: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        avatar: PropTypes.shape({
          url: PropTypes.string,
        }),
      }),
    }),
  }).isRequired,
  navigation: PropTypes.shape({
    reset: PropTypes.func,
  }).isRequired,
};

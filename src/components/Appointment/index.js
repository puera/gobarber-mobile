import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { parseISO, formatRelative, addHours } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Left, Avatar, Info, Name, Time } from './styles';

export default function Appointment({ data, onCancel }) {
  const dateParsed = useMemo(() => {
    return formatRelative(addHours(parseISO(data.date), 1), new Date(), {
      locale: ptBR,
      addSufix: true,
    });
  }, [data.date]);
  return (
    <Container past={data.past}>
      <Left>
        <Avatar
          source={{
            uri: data.provider.avatar
              ? data.provider.avatar.url
              : `http://api.adorable.io/avatar/50/${data.provider.name}.png`,
          }}
        />
        <Info>
          <Name>{data.provider.name} </Name>
          <Time>{dateParsed}</Time>
        </Info>
      </Left>
      {data.cancelable && !data.canceled_at && (
        <TouchableOpacity onPress={onCancel}>
          <Icon name="event-busy" size={20} color="#f64c75" />
        </TouchableOpacity>
      )}
    </Container>
  );
}

Appointment.propTypes = {
  data: PropTypes.shape({
    past: PropTypes.bool,
    date: PropTypes.string,
    cancelable: PropTypes.bool,
    canceled_at: PropTypes.string,
    provider: PropTypes.shape({
      avatar: PropTypes.shape({
        url: PropTypes.string,
      }),
      name: PropTypes.string,
    }),
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
};

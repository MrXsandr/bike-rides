import React from 'react';
import { Container } from 'react-bootstrap';
import Authorization from './Authorization';
import Registration from './Registration';

export default function PersonalPage() {
  return (
    <Container>
      <div>
        <Registration />
      </div>
      <div>
        <Authorization />
      </div>
    </Container>
  );
}

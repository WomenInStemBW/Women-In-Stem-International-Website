// src/emails/ContactFormEmail.jsx
import React from 'react';
import {
  Html,
  Body,
  Head,
  Heading,
  Hr,
  Container,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

export const ContactFormEmail = ({ name, email, phone, subject, message }) => {
  return (
    <Html>
      <Head />
      <Preview>New contact form submission from {name}</Preview>
      <Tailwind>
        <Body className="bg-gray-100">
          <Container className="bg-white border border-gray-200 rounded-lg shadow-sm mx-auto px-4 py-8 max-w-2xl">
            <Section className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-t-lg px-6 py-8 text-center">
              <Heading className="text-white text-2xl font-bold m-0">
                New Contact Form Submission
              </Heading>
            </Section>
            
            <Section className="px-6 py-8">
              <div className="mb-6 p-4 bg-gray-50 rounded border-l-4 border-purple-600">
                <Text className="text-sm font-semibold text-purple-600 mb-1">Name:</Text>
                <Text className="text-gray-800 m-0">{name}</Text>
              </div>
              
              <div className="mb-6 p-4 bg-gray-50 rounded border-l-4 border-purple-600">
                <Text className="text-sm font-semibold text-purple-600 mb-1">Email:</Text>
                <a href={`mailto:${email}`} className="text-blue-600 no-underline">
                  <Text className="m-0">{email}</Text>
                </a>
              </div>
              
              <div className="mb-6 p-4 bg-gray-50 rounded border-l-4 border-purple-600">
                <Text className="text-sm font-semibold text-purple-600 mb-1">Phone:</Text>
                <Text className="text-gray-800 m-0">{phone || 'Not provided'}</Text>
              </div>
              
              <div className="mb-6 p-4 bg-gray-50 rounded border-l-4 border-purple-600">
                <Text className="text-sm font-semibold text-purple-600 mb-1">Subject:</Text>
                <Text className="text-gray-800 m-0">{subject}</Text>
              </div>
              
              <div className="p-4 bg-gray-50 rounded border-l-4 border-purple-600">
                <Text className="text-sm font-semibold text-purple-600 mb-1">Message:</Text>
                <Text className="text-gray-800 whitespace-pre-wrap m-0">{message}</Text>
              </div>
            </Section>
            
            <Hr className="border-gray-300 my-6" />
            
            <Section className="text-center">
              <Text className="text-gray-500 text-sm">
                This email was sent from the Women in STEM International contact form.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};
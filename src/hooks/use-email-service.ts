/**
 * 📱 React Hook for Email Service Integration
 * 
 * Provides easy-to-use React hooks for sending emails with loading states,
 * error handling, and automatic retry logic.
 */

import { useState, useCallback } from 'react';
import { emailService, EmailRequest, EmailResponse } from '@/lib/email-service';

export interface UseEmailServiceState {
  loading: boolean;
  error: string | null;
  lastResponse: EmailResponse | null;
}

export interface UseEmailServiceReturn extends UseEmailServiceState {
  sendEmail: (request: EmailRequest) => Promise<EmailResponse>;
  sendVerificationEmail: (to: string, code: string, name?: string) => Promise<EmailResponse>;
  sendWelcomeEmail: (to: string, userName: string) => Promise<EmailResponse>;
  sendPasswordResetEmail: (to: string, resetLink: string) => Promise<EmailResponse>;
  clearError: () => void;
  reset: () => void;
}

/**
 * Hook for accessing the email service with state management
 */
export function useEmailService(): UseEmailServiceReturn {
  const [state, setState] = useState<UseEmailServiceState>({
    loading: false,
    error: null,
    lastResponse: null,
  });

  const setLoading = useCallback((loading: boolean) => {
    setState(prev => ({ ...prev, loading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState(prev => ({ ...prev, error }));
  }, []);

  const setLastResponse = useCallback((response: EmailResponse | null) => {
    setState(prev => ({ ...prev, lastResponse: response }));
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const reset = useCallback(() => {
    setState({
      loading: false,
      error: null,
      lastResponse: null,
    });
  }, []);

  const sendEmail = useCallback(async (request: EmailRequest): Promise<EmailResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await emailService.sendEmail(request);
      setLastResponse(response);
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setLastResponse]);

  const sendVerificationEmail = useCallback(async (
    to: string, 
    code: string, 
    name?: string
  ): Promise<EmailResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await emailService.sendVerificationEmail(to, code, name);
      setLastResponse(response);
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setLastResponse]);

  const sendWelcomeEmail = useCallback(async (
    to: string, 
    userName: string
  ): Promise<EmailResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await emailService.sendWelcomeEmail(to, userName);
      setLastResponse(response);
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setLastResponse]);

  const sendPasswordResetEmail = useCallback(async (
    to: string, 
    resetLink: string
  ): Promise<EmailResponse> => {
    setLoading(true);
    setError(null);

    try {
      const response = await emailService.sendPasswordResetEmail(to, resetLink);
      setLastResponse(response);
      return response;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [setLoading, setError, setLastResponse]);

  return {
    ...state,
    sendEmail,
    sendVerificationEmail,
    sendWelcomeEmail,
    sendPasswordResetEmail,
    clearError,
    reset,
  };
}

/**
 * Hook specifically for verification emails with additional utilities
 */
export function useVerificationEmail() {
  const { sendVerificationEmail, ...emailState } = useEmailService();

  const generateVerificationCode = useCallback((): string => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }, []);

  const sendWithGeneratedCode = useCallback(async (
    to: string, 
    name?: string
  ): Promise<{ code: string; response: EmailResponse }> => {
    const code = generateVerificationCode();
    const response = await sendVerificationEmail(to, code, name);
    return { code, response };
  }, [sendVerificationEmail, generateVerificationCode]);

  return {
    ...emailState,
    sendVerificationEmail,
    generateVerificationCode,
    sendWithGeneratedCode,
  };
}

/**
 * Hook for bulk email operations (like newsletters)
 */
export function useBulkEmailService() {
  const [state, setState] = useState<{
    loading: boolean;
    progress: number;
    total: number;
    errors: string[];
    completed: number;
  }>({
    loading: false,
    progress: 0,
    total: 0,
    errors: [],
    completed: 0,
  });

  const sendBulkEmails = useCallback(async (
    requests: EmailRequest[],
    onProgress?: (completed: number, total: number) => void
  ): Promise<{ successful: EmailResponse[]; failed: { request: EmailRequest; error: string }[] }> => {
    setState(prev => ({
      ...prev,
      loading: true,
      total: requests.length,
      progress: 0,
      errors: [],
      completed: 0,
    }));

    const successful: EmailResponse[] = [];
    const failed: { request: EmailRequest; error: string }[] = [];

    for (let i = 0; i < requests.length; i++) {
      const request = requests[i];
      
      try {
        const response = await emailService.sendEmail(request);
        successful.push(response);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        failed.push({ request, error: errorMessage });
        setState(prev => ({
          ...prev,
          errors: [...prev.errors, `Failed to send to ${request.to}: ${errorMessage}`],
        }));
      }

      const completed = i + 1;
      setState(prev => ({
        ...prev,
        progress: completed,
        completed,
      }));

      if (onProgress) {
        onProgress(completed, requests.length);
      }

      // Add small delay to prevent overwhelming the server
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    setState(prev => ({
      ...prev,
      loading: false,
    }));

    return { successful, failed };
  }, []);

  const reset = useCallback(() => {
    setState({
      loading: false,
      progress: 0,
      total: 0,
      errors: [],
      completed: 0,
    });
  }, []);

  return {
    ...state,
    sendBulkEmails,
    reset,
  };
}

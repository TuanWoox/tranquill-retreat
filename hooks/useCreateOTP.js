import { useMutation} from '@tanstack/react-query';
import { createOTP } from '../services/otpService';

export default function useCreateOTP() {

    const {
        mutate: triggerOTPService,
        isLoading,
        isSuccess,
        error,
        data,
    } = useMutation({
        mutationFn: createOTP,
        onSuccess: (data) => {},
        onError: (error) => {
            console.error("Error sending OTP:", error.message);
        },
    });

    return {
        triggerOTPService,
        isLoading,
        isSuccess,
        error,
        data,
    };
}

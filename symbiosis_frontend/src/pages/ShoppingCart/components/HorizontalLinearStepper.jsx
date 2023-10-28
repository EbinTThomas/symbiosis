import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import DeliveryDetails from './DeliveryDetails';
import CartList from './CartList';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const steps = ['Shopping Cart', 'Delivery Details', 'Payment'];

export default function HorizontalLinearStepper() {
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        activeStep === 0 ? navigate(from, { replace: true })
        : setActiveStep((prevActiveStep) => prevActiveStep - 1);
};

const cartComponents = [
    <CartList handleNext={handleNext} handleBack={handleBack} />,
    <DeliveryDetails handleNext={handleNext} handleBack={handleBack} />
];

return (
    <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep}>
            {steps.map((label, index) => (
                <Step key={label} onClick={() => setActiveStep(index)}>
                    <StepLabel>{label}</StepLabel>
                </Step>
            ))}
        </Stepper>
        {activeStep !== steps.length && (
            <>
                <Typography sx={{ mt: 2, mb: 1 }}>
                    {
                        cartComponents[activeStep]
                    }
                </Typography>
            </>
        )}
    </Box>
);
}

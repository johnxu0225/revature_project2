import { TextField, Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Envelope } from './AddMoneyInterfaces';
import { useEffect, useState } from 'react';

interface IProps {
	colorClass: string,
	envelope: Envelope,
	onAmountChange: (amount: string) => void,
}

export const EnvelopeListCard: React.FC<IProps> = ({ colorClass, envelope, onAmountChange }: IProps) => {
	const [amount, setAmount] = useState(envelope.amount);

	useEffect(() => {
        onAmountChange(amount);
	}, [amount]);

	return (
		<Card sx={{ minWidth: 275, minHeight: 275, boxShadow: 1, borderRadius: 2 }} variant="outlined">
			<div className={colorClass}></div>
			<CardContent>
				<Typography variant="h5" component="div" sx={{ fontSize: 25 }}>
					{envelope.envelope_description}
				</Typography>
				<Typography variant="h1" component="div" sx={{ fontSize: 25 }}>
					{"$" + envelope.balance + "/$" + envelope.max_limit}
				</Typography>
			</CardContent>
			<Box display="flex" justifyContent="center" alignItems="center">
				<TextField
					label="Amount to add"
					fullWidth
					margin="normal"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					sx={{ width: "75%" }}
				/>
			</Box>
		</Card>
	)
}
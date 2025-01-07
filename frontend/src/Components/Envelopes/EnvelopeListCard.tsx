import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

// lets go dude snake case and camel case in the same codebase???? gamign
interface History {
	amount_history_id: number,
	envelope_id: number,
	transaction_id: number,
	envelope_amount: number
}

interface Envelope {
	envelope_id: number,
	user_id: number,
	envelope_description: string,
	balance: number,
	max_limit: number,
	envelope_history: History[],
}

interface IProps {
	colorClass: string,
	envelope: Envelope
}

export const EnvelopeListCard: React.FC<IProps> = ({ colorClass, envelope }: IProps) => {

	// Horribly inefficient way to render different tiers of envelopes, but whatever
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
		</Card>
	)
}
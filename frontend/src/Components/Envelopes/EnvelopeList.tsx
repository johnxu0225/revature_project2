import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

interface Envelope {
	envelope_id: number,
	user_id: number,
	envelope_description: string,
	balance: number,
	max_limit: number
}

export const EnvelopeList: React.FC = () => {

	let envelopes: Envelope[] = [];
	for (let i = 0; i < 10; i++) {
		envelopes.push({
			envelope_id: i,
			user_id: 1,
			envelope_description: "asdf",
			balance: 999,
			max_limit: 999
		});
	}
	return (
		<div className = "envelope-container">
			<p>My Envelopes</p>
			<div className="envelope-row">
				{envelopes.map((env) => {
					return (
						<Card sx = {{ minWidth: 275, minHeight: 275, boxShadow: 1 }} variant = "outlined">
							<CardContent>
								<Typography variant="h5" component="div" sx = {{fontSize: 25}}>
									{env.envelope_description}
								</Typography>
								<Typography variant="h1" component="div" sx = {{fontSize: 25}}>
									{"$" + env.balance + "/$" + env.max_limit}
								</Typography>
							</CardContent>
						</Card>
					)
				})}
			</div>
		</div>
	)
}
import BaseInput from "@/components/atoms/input";
import BaseTextarea from "@/components/atoms/textarea";
import { EnvelopeClosedIcon, InfoCircledIcon } from "@radix-ui/react-icons";

export const metadata = {
	title: "Input - Dev",
};

export default function DevInputPage() {
	return (
		<div className="flex flex-col my-10 gap-10">
			<div className="flex gap-5">
				<div className="flex flex-col gap-2">
					<h3>Base Input:</h3>
					<BaseInput
						placeholder="your.name@email.com"
						trailingIcon={<InfoCircledIcon />}
						leadingIcon={<EnvelopeClosedIcon />}
						hint="This is a hint that will be shown below the input."
					/>
				</div>
				<div className="flex flex-col gap-2">
					<h3>Error Input:</h3>
					<BaseInput
						isError
						placeholder="your.name@email.com"
						trailingIcon={<InfoCircledIcon />}
						leadingIcon={<EnvelopeClosedIcon />}
						hint="This field is erroring."
					/>
				</div>

				<div className="flex flex-col gap-2">
					<h3>Leading text Input:</h3>
					<BaseInput
						leadingText="https://"
						placeholder="www.email.com"
						trailingIcon={<InfoCircledIcon />}
					/>
				</div>

				<div className="flex flex-col gap-2">
					<h3>Disabled Input:</h3>
					<BaseInput placeholder="your.name@email.com" disabled />
				</div>
			</div>
			<div className="flex gap-5">
				<div className="flex flex-col gap-2">
					<h3>Description:</h3>
					<BaseTextarea placeholder="Enter a description..." />
				</div>

				<div className="flex flex-col gap-2">
					<h3>Error:</h3>
					<BaseTextarea isError />
				</div>

				<div className="flex flex-col gap-2">
					<h3>Disabled:</h3>
					<BaseTextarea disabled />
				</div>
			</div>
		</div>
	);
}

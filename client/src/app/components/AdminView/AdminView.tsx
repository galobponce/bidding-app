import { FC } from "react";
import { Center } from "@chakra-ui/react";

import { Filters } from './';


export const AdminView: FC = () => {
	return (
		<Center flexDir='column'>
			<Filters />
		</Center>
	);
};
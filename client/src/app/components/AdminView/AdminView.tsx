import { FC } from "react";
import { Flex } from "@chakra-ui/react";

import { SearchBar } from './';


export const AdminView: FC = () => {
	return (
		<Flex>
			<SearchBar />
		</Flex>
	);
};
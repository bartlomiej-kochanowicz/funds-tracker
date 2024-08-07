import { CurrencyCombobox } from "components/CurrencyCombobox";
import { useUserContext } from "contexts/UserContext";

export const CurrencySelector = () => {
	const { user, updateUser, loading } = useUserContext();

	const handleChange = (currency: string) => updateUser({ defaultCurrency: currency });

	return (
		<CurrencyCombobox
			onChange={handleChange}
			value={user.defaultCurrency}
			disabled={loading}
		/>
	);
};

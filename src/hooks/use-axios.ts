import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import { axios } from "@/lib/axios";

interface UseAxiosOptions {
	queryKey: string[];
	enabled?: boolean;
}

export function useAxios<TData = unknown, TError = unknown>(
	url: string,
	config?: AxiosRequestConfig,
	options?: UseAxiosOptions,
) {
	const queryClient = useQueryClient();

	const fetcher = async (): Promise<TData> => {
		const response = await axios.get<TData>(url, config);
		return response.data;
	};

	const query = useQuery<TData, TError, TData, string[]>(
		{ queryKey: options?.queryKey || [url], queryFn: fetcher, enabled: options?.enabled },
	);

	const mutate = useMutation<TData, TError, unknown>(
		async (data) => {
			const response = await axios.post<TData>(url, data, config);
			return response.data;
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries({ queryKey: options?.queryKey || [url] });
			},
		},
	);

	return { query, mutate };
}

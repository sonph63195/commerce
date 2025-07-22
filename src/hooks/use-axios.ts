import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseMutationResult,
  QueryKey,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import { AxiosRequestConfig, AxiosError } from "axios";
import { axios } from "@/lib/axios";

// ====================================================================================
// API Client
// ====================================================================================

const apiClient = {
  get: <TData>(url: string, config?: AxiosRequestConfig) =>
    axios.get<TData>(url, config).then((res) => res.data),
  post: <TData, TVariables>(url: string, data?: TVariables, config?: AxiosRequestConfig) =>
    axios.post<TData>(url, data, config).then((res) => res.data),
  put: <TData, TVariables>(url: string, data?: TVariables, config?: AxiosRequestConfig) =>
    axios.put<TData>(url, data, config).then((res) => res.data),
  patch: <TData, TVariables>(url: string, data?: TVariables, config?: AxiosRequestConfig) =>
    axios.patch<TData>(url, data, config).then((res) => res.data),
  delete: <TData>(url: string, config?: AxiosRequestConfig) =>
    axios.delete<TData>(url, config).then((res) => res.data),
};


// ====================================================================================
// Query Hook
// ====================================================================================

type QueryOptions<TData> = UseQueryOptions<TData, AxiosError, TData, QueryKey>;

export const useApiQuery = <TData>(
  queryKey: QueryKey,
  url: string,
  config?: AxiosRequestConfig,
  options?: Omit<QueryOptions<TData>, 'queryKey' | 'queryFn'>,
): UseQueryResult<TData, AxiosError> => {
  const queryFn = () => apiClient.get<TData>(url, config);
  return useQuery<TData, AxiosError, TData, QueryKey>({
    queryKey,
    queryFn,
    ...options,
  });
};


// ====================================================================================
// Mutation Hook
// ====================================================================================

type MutationOptions<TData, TVariables> = UseMutationOptions<TData, AxiosError, TVariables, unknown>;

export const useApiMutation = <TData, TVariables>(
  url: string,
  method: 'post' | 'put' | 'patch' | 'delete' = 'post',
  config?: AxiosRequestConfig,
  options?: MutationOptions<TData, TVariables>,
): UseMutationResult<TData, AxiosError, TVariables, unknown> => {
  const mutationFn = (data?: TVariables) => {
    switch (method) {
      case 'post':
        return apiClient.post<TData, TVariables>(url, data, config);
      case 'put':
        return apiClient.put<TData, TVariables>(url, data, config);
      case 'patch':
        return apiClient.patch<TData, TVariables>(url, data, config);
      case 'delete':
        return apiClient.delete<TData>(url, config);
      default:
        // This should not happen
        throw new Error(`Invalid mutation method: ${method}`);
    }
  };

  return useMutation<TData, AxiosError, TVariables, unknown>({
    mutationFn,
    ...options,
    onSuccess: (data, variables, context) => {
      // Invalidate queries or perform other actions on success
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
  });
};
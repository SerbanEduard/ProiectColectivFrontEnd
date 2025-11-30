# AuthApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**authMiddlewarePost**](#authmiddlewarepost) | **POST** /auth/middleware | JWT Authentication Middleware|
|[**authOwnerIdPost**](#authowneridpost) | **POST** /auth/owner/{id} | Owner Authorization Middleware|

# **authMiddlewarePost**
> string authMiddlewarePost()

Middleware to verify JWT token from Authorization header or query parameter

### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let authorization: string; //Bearer token (optional) (default to undefined)
let token: string; //Token for WebSocket connections (optional) (default to undefined)

const { status, data } = await apiInstance.authMiddlewarePost(
    authorization,
    token
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **authorization** | [**string**] | Bearer token | (optional) defaults to undefined|
| **token** | [**string**] | Token for WebSocket connections | (optional) defaults to undefined|


### Return type

**string**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | Token is valid |  -  |
|**401** | Unauthorized |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **authOwnerIdPost**
> string authOwnerIdPost()

Middleware to ensure the authenticated user matches the resource owner

### Example

```typescript
import {
    AuthApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new AuthApi(configuration);

let id: string; //Resource ID that must match authenticated user ID (default to undefined)

const { status, data } = await apiInstance.authOwnerIdPost(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**string**] | Resource ID that must match authenticated user ID | defaults to undefined|


### Return type

**string**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | User is authorized |  -  |
|**403** | Forbidden |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


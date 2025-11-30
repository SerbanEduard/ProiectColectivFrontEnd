# FriendRequestsApi

All URIs are relative to *http://localhost*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**friendRequestsFromUserIdToUserIdPost**](#friendrequestsfromuseridtouseridpost) | **POST** /friend-requests/{fromUserId}/{toUserId} | Send a friend request|
|[**friendRequestsFromUserIdToUserIdPut**](#friendrequestsfromuseridtouseridput) | **PUT** /friend-requests/{fromUserId}/{toUserId} | Respond to a friend request|
|[**friendRequestsUserIdGet**](#friendrequestsuseridget) | **GET** /friend-requests/{userId} | Get pending friend requests|

# **friendRequestsFromUserIdToUserIdPost**
> friendRequestsFromUserIdToUserIdPost()

Send a friend request from one user to another

### Example

```typescript
import {
    FriendRequestsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FriendRequestsApi(configuration);

let fromUserId: string; //Sender User ID (default to undefined)
let toUserId: string; //Recipient User ID (default to undefined)

const { status, data } = await apiInstance.friendRequestsFromUserIdToUserIdPost(
    fromUserId,
    toUserId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **fromUserId** | [**string**] | Sender User ID | defaults to undefined|
| **toUserId** | [**string**] | Recipient User ID | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | Created |  -  |
|**400** | Bad Request |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **friendRequestsFromUserIdToUserIdPut**
> friendRequestsFromUserIdToUserIdPut(body)

Accept or deny a friend request

### Example

```typescript
import {
    FriendRequestsApi,
    Configuration,
    DtoRespondFriendRequestRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new FriendRequestsApi(configuration);

let fromUserId: string; //Sender User ID (default to undefined)
let toUserId: string; //Recipient User ID (default to undefined)
let body: DtoRespondFriendRequestRequest; //Accept or deny

const { status, data } = await apiInstance.friendRequestsFromUserIdToUserIdPut(
    fromUserId,
    toUserId,
    body
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **body** | **DtoRespondFriendRequestRequest**| Accept or deny | |
| **fromUserId** | [**string**] | Sender User ID | defaults to undefined|
| **toUserId** | [**string**] | Recipient User ID | defaults to undefined|


### Return type

void (empty response body)

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**400** | Bad Request |  -  |
|**404** | Not Found |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **friendRequestsUserIdGet**
> DtoFriendRequestListResponse friendRequestsUserIdGet()

Get pending friend requests for a user

### Example

```typescript
import {
    FriendRequestsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new FriendRequestsApi(configuration);

let userId: string; //User ID (default to undefined)

const { status, data } = await apiInstance.friendRequestsUserIdGet(
    userId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **userId** | [**string**] | User ID | defaults to undefined|


### Return type

**DtoFriendRequestListResponse**

### Authorization

[Bearer](../README.md#Bearer)

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: */*


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | OK |  -  |
|**500** | Internal Server Error |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)


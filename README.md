# InProjectMarket

# Technological stack
- Django
- Django Rest Framework
- React
- PostgreSQL
- JWT
- WebSockets
- Celery/Redis

## Installation
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd InProjectMarket
   ```
2. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # For Unix/Mac
   venv\Scripts\activate  # For Windows
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Application
```bash
python manage.py runserver
```

# Description:
## Requests that do not require a token:
- Register a user<br>
POST /api/v1/auth/register<br>
Content-Type: application/json<br>
{<br>
&nbsp;&nbsp;&nbsp;"username": "username",<br>
&nbsp;&nbsp;&nbsp;"password": "password",<br>
&nbsp;&nbsp;&nbsp;"email": "username@gmail.com",<br>
&nbsp;&nbsp;&nbsp;"first_name": "Name",<br>
&nbsp;&nbsp;&nbsp;"last_name": "Surname",<br>
&nbsp;&nbsp;&nbsp;"phone_number": "+123456789",<br>
&nbsp;&nbsp;&nbsp;"address": "Street, City, Code"<br>
}<br>
<br>
- User authorization<br>
POST /api/v1/auth/login<br>
Content-Type: application/json<br>
{<br>
&nbsp;&nbsp;&nbsp;"username": "username",<br>
&nbsp;&nbsp;&nbsp;"password": "password"<br>
}<br>
<br>
- Update access token<br>
POST api/v1/token/refresh/<br>
{<br>
&nbsp;&nbsp;&nbsp;"refresh": "token_refresh"<br>
}<br>
## Requests that require a token (Authorization: Bearer your-access-token):
### Users
- Retrieve a user profile<br>
GET /api/v1/auth/profile<br>
<br>
- Update profile<br>
PUT /api/v1/auth/profile<br>
Content-Type: application/json<br>
{<br>
&nbsp;&nbsp;&nbsp;"first_name": "Name",<br>
&nbsp;&nbsp;&nbsp;"last_name": "Surname",<br>
&nbsp;&nbsp;&nbsp;"phone_number": "+123456789",<br>
&nbsp;&nbsp;&nbsp;"address": "Street, City, Code",<br>
&nbsp;&nbsp;&nbsp;"email": "username@gmail.com"<br>
}<br>
<br>
- Delete profile<br>
DELETE /api/v1/auth/profile/

### Products

- Retrieve a list of products<br>
GET /api/v1/shop/products<br>
<br>
- Retrieve a separate product<br>
GET api/v1/shop/products/{product_id}<br>
<br>
- Retrieve a list of categories<br>
GET /api/v1/shop/categories<br>
<br>
- Retrieve a separate category<br>
GET /api/v1/shop/categories/{category_id}<br>
<br>
- Retrieve a list of tags<br>
GET /api/v1/shop/tags<br>
<br>
- Retrieve a separate category<br>
GET /api/v1/shop/tags/{tag_id}<br>
<br>

Other CRUD operations (create, update, delete) are available only to administrators. Administrators can perform these operations either through the administrative panel or through the REST API.

### Carts
- Retrieve a user's shopping carts<br>
GET /api/v1/carts<br>
<br>
- Add item to cart<br>
POST /api/v1/carts/items<br>
Content-Type: application/json<br>
{<br>
&nbsp;&nbsp;&nbsp;"product_id": 1,<br>
&nbsp;&nbsp;&nbsp;"quantity": 2<br>
}<br>
<br>
- Update item in cart<br>
PUT /api/v1/carts/items/{item_id}<br>
Content-Type: application/json<br>
{<br>
&nbsp;&nbsp;&nbsp;"quantity": 3,<br>
}<br>
<br>
- Delete item from cart<br>
DELETE /api/v1/carts/items/{item_id}<br>
<br>

### Orders

- Retrieve user orders<br>
GET /api/v1/orders<br>
<br>
- Create an order <br>
POST /api/v1/orders<br>
Content-Type: application/json<br>
{<br>
&nbsp;&nbsp;&nbsp;"cart": 1,<br>
}<br>
<br>
- Detailed info for user order<br>
GET /api/v1/orders/{order_id}<br>
<br>
- Update order<br>
PUT /api/v1/orders/{order_id}<br>
Content-Type: application/json<br>
{<br>
&nbsp;&nbsp;&nbsp;"status": "canceled",<br>
}<br>
<br>
- Delete order<br>
DELETE /api/v1/orders/{order_id}<br>
<br>
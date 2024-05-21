# Suparbac

Suparbac is an open source, self-hosted service for developers to add RBAC to their Supabase apps.

You can read more about the motivation and architecture [here](https://supatable.com/suparbac).

This repository includes:

* A Next.js application named Suparbac.
* A separate integration testing app named Suparbac-app.

## Suparbac

Suparbac is a Next.js app, you can deploy to a hosted service. To get started, you'll need to configure Suparbac to connect to your Supabase instance by setting the appropriate environment variables. Once that's done, your app will connect to Suparbac, which will then act as an intermediary, forwarding most of your requests to Supabase on your behalf.

Suparbac acts like a security guard for your Supabase data, especially for sensitive actions like creating, reading, updating, or deleting tables or views. When these requests come through Suparbac, it will check if the user making the request has the necessary permissions before allowing it to proceed to Supabase. This helps ensure that only authorized users can modify your data.

To safeguard your data, unauthenticated requests are denied by default, resulting in an "Unauthorized" (401) response. However, this behavior can be customized to fit your specific needs.

For authorized users, Suparbac verifies their permissions against the permissions column defined in your user table (follow below steps for proper setup). If a user lacks the necessary permission for an action, Suparbac will return a "Forbidden" (403) response.

Here's a simpler way to understand the steps to set up Suparbac:

1. **Verify User Table:** Before you begin, ensure you have a users/profiles table set up exactly as [Supabase](https://supabase.com/docs/guides/auth/managing-user-data) recommends.

2. **Add Permissions Column:** Create a migration to add a new "permissions" column to your existing users table. It should look similar like this [file](https://github.com/phungleson/suparbac/blob/main/packages/suparbac-app/supabase/migrations/20230031034630_add_users_permissions.sql)

3. **Assign User Permissions:** Grant appropriate permissions to your users. You can do this either through the Supabase Studio interface or by using a script for a more automated approach.

4. **Deploy Suparbac:** Finally, deploy Suparbac and configure your apps to connect and use Suparbac.

## Suparbac-app

Suparbac-app serves 2 purposes:

* **Provides a blueprint for integrating your app with Suparbac:** The Suparbac-app acts as a reference guide, showcasing how to configure your own application to seamlessly work with Suparbac. By following its example, you'll gain a clear understanding of the steps required for a successful integration.
* **Ensures Suparbac functions flawlessly without compromising Supabase:** The Suparbac-app incorporates integration tests. These tests serve a critical purpose: verifying that Suparbac operates as intended without introducing any disruptions to the core functionalities of Supabase. 

using System;
using System.Security.Cryptography;

namespace UserManagementHomework.Services
{
    public static class HashService
    {
        public static string HashPassword(string password)
        {
            HashAlgorithm hashAlg = new SHA256CryptoServiceProvider();
            byte[] bytValue = System.Text.Encoding.UTF8.GetBytes(password);
            byte[] bytHash = hashAlg.ComputeHash(bytValue);
            return Convert.ToBase64String(bytHash);
        }
    }
}

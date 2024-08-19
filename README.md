# EncryptApp 1.0

This is the ultimate encryption and decryption tool that supports so many ciphers. You can encode and decode messages using different ciphers to secure your data.

## Ciphers

1. **Caesar Cipher**
   - A substitution cipher that shifts each letter by a fixed number of positions in the alphabet.

2. **Affine Cipher**
   - A substitution cipher that combines linear transformations and modular arithmetic.

3. **Substitution Cipher**
   - A cipher where each letter in the plaintext is replaced by another letter.

4. **Playfair Cipher**
   - A digraph substitution cipher using a 5x5 matrix of letters.

5. **Vigenère Cipher**
   - A polyalphabetic substitution cipher using a keyword to shift letters.

6. **Autokey Cipher**
   - A variation of the Vigenère Cipher where the key is expanded using the plaintext itself.

7. **Homophonic Substitution Cipher**
   - A cipher where each letter is mapped to multiple symbols, reducing frequency analysis effectiveness.

8. **Gronsfeld Cipher**
   - A variant of the Vigenère Cipher using a numeric key for encryption and decryption.

9. **Rail Fence Cipher**
   - A transposition cipher that writes the plaintext in a zigzag pattern across multiple lines.

10. **Scytale Cipher**
    - An ancient transposition cipher that encrypts text by wrapping it around a cylindrical tool.

11. **Columnar Transposition Cipher**
    - A transposition cipher that writes the plaintext into a grid and reads it off in columns.

12. **Four-Square Cipher**
    - A complex cipher using two 5x5 grids for encryption and decryption.

## Usage

make sure to have Node.js installed otherwise it wont work.

1. **Install Dependencies**:
   ```
   npm install
   ```

2. **Start the Server**:
   ```
   npm start
   ```

3. **Access the Application**:
   Open your web browser and navigate to `http://localhost:3000`.

4. **API Endpoints**:
   - **/encode**: POST request to encode data.
   - **/decode**: POST request to decode data.
   - **/ciphers**: GET request to retrieve a list of available ciphers.

## Example

To encode a message using the Caesar Cipher:
1. Send a POST request to `/encode` with JSON payload:
   ```json
   {
     "cipher": "caesar",
     "data": "Hello, World!",
     "key": 3
   }
   ```

To decode a message using the Caesar Cipher:
1. Send a POST request to `/decode` with JSON payload:
   ```json
   {
     "cipher": "caesar",
     "encodedData": "Khoor, Zruog!",
     "key": 3
   }
   ```

## Questions

If you have questions, contact me on Slack **@JubilantMarmot**.
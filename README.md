# 🤖 Mahiru PPOB Bot

<div align="center">

![Mahiru PPOB Banner](https://files.catbox.moe/h9tt6l.jpg)

**Automate your WhatsApp PPOB transactions with Atlantic API integration**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?style=flat-square)](https://github.com/Liwirya/Mahiru-PPOB)
[![License](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/status-Active-brightgreen.svg?style=flat-square)]()
[![Node.js](https://img.shields.io/badge/node.js-v16+-orange.svg?style=flat-square)](https://nodejs.org/)
[![WhatsApp](https://img.shields.io/badge/WhatsApp-Bot-25D366.svg?style=flat-square)](https://whatsapp.com/)

</div>

---

## 🌟 Features

<table>
<tr>
<td width="50%">

### 🚀 **Core Features**
- ✅ Automated PPOB transactions
- ✅ WhatsApp integration
- ✅ Atlantic API H2H support
- ✅ Real-time transaction processing
- ✅ Multi-service support

</td>
<td width="50%">

### 🛡️ **Security & Reliability**
- ✅ Secure API authentication
- ✅ Transaction logging
- ✅ Error handling
- ✅ IP whitelisting support
- ✅ 24/7 operation capability

</td>
</tr>
</table>

---

## 🏗️ System Architecture

```mermaid
graph LR
    A[WhatsApp User] --> B[Mahiru Bot]
    B --> C[Atlantic API]
    C --> D[Transaction Processing]
    D --> C
    C --> B
    B --> A
```

**Data Flow:** `User Request → Bot Processing → API Call → Transaction → Response → User Notification`

---

## 🚀 Quick Start

> **⚠️ Prerequisites:** You need Atlantic H2H API credentials before proceeding

### 📋 Requirements

| Component | Version | Status |
|-----------|---------|--------|
| Node.js | v16+ | Required |
| npm | Latest | Required |
| Git | Latest | Required |
| Atlantic API Key | Active | Required |

---

## 🔐 Phase 1: Atlantic API Setup

### Step 1: Account Registration

<details>
<summary><strong>📝 Click to expand registration guide</strong></summary>

1. **Create Atlantic Account**
   - Visit [Atlantic Pedia Portal](https://m.atlantic-pedia.co.id/)
   - Complete registration with valid information
   - Verify your email address

2. **Account Verification**
   - Ensure all personal information is accurate
   - Complete KYC if required
   - Wait for account activation

</details>

### Step 2: H2H Upgrade Request

<details>
<summary><strong>🔄 Click to expand upgrade process</strong></summary>

> ⏰ **Processing Time:** 1-3 business days

1. **Access Upgrade Menu**
   - Login to your Atlantic Pedia account
   - Navigate to **Profile** → **H2H Account Upgrade**

2. **Fill Application Form**
   ```
   API Usage: WhatsApp PPOB Transaction Bot
   Bot URL/Number: [Your WhatsApp Bot Number]
   Description: Automated PPOB transaction service via WhatsApp using Atlantic API
   ```

3. **Submit & Wait**
   - Submit the completed form
   - Monitor your email for approval status
   - Contact support if no response after 3 days

</details>

### Step 3: API Credentials

<details>
<summary><strong>🔑 Click to expand credentials setup</strong></summary>

1. **Access H2H Portal**
   - Login to [Atlantic H2H Portal](https://atlantich2h.com/)
   - Use the same credentials as Atlantic Pedia

2. **Retrieve API Key**
   - Go to **API Settings** menu
   - Copy your **API Key** (keep it secure!)
   - Note down any additional credentials

3. **IP Whitelisting**
   ```
   Recommended Setting: 0.0.0.0 (allows all IPs)
   Production Setting: [Your server's specific IP]
   ```

</details>

---

## ⚙️ Phase 2: Bot Installation

### Step 1: Clone Repository

```bash
# Clone the repository
git clone https://github.com/Liwirya/Mahiru-PPOB.git

# Navigate to project directory
cd Mahiru-PPOB
```

### Step 2: Install Dependencies

```bash
# Install all required packages
npm install

# Verify installation
npm list --depth=0
```

### Step 3: Configuration

**Edit `settings.js`:**

```javascript
// 🔑 Atlantic API Configuration
const apikeyAtlantic = "YOUR_ATLANTIC_API_KEY_HERE"; // Replace with your actual API key

// ⚙️ Bot Settings
global.ownerNumber = "628XXXXXXXXXX@s.whatsapp.net"; // Your WhatsApp number (Owner)

// 🌐 Optional Settings
global.botName = "Mahiru PPOB Bot";
global.botPrefix = ".";
global.timezone = "Asia/Jakarta";
```

### Step 4: Launch Bot

```bash
# Start the bot
npm start

# For production (with PM2)
npm run prod
```

<div align="center">

### 🎉 **Congratulations!** Your bot is now running!

</div>

---

## 📱 Bot Commands

<table>
<tr>
<th width="30%">Category</th>
<th width="35%">Command</th>
<th width="35%">Description</th>
</tr>
<tr>
<td rowspan="3"><strong>🏪 PPOB Services</strong></td>
<td><code>.pulsa [number] [nominal]</code></td>
<td>Top up phone credit</td>
</tr>
<tr>
<td><code>.listrik [token] [nominal]</code></td>
<td>Purchase electricity token</td>
</tr>
<tr>
<td><code>.paket [number] [package]</code></td>
<td>Buy data packages</td>
</tr>
<tr>
<td rowspan="2"><strong>💰 Account</strong></td>
<td><code>.saldo</code></td>
<td>Check balance</td>
</tr>
<tr>
<td><code>.history</code></td>
<td>Transaction history</td>
</tr>
<tr>
<td rowspan="2"><strong>ℹ️ Information</strong></td>
<td><code>.help</code></td>
<td>Show all commands</td>
</tr>
<tr>
<td><code>.status</code></td>
<td>Bot system status</td>
</tr>
</table>

---

## 🔧 Troubleshooting

<details>
<summary><strong>🚨 Common Issues & Solutions</strong></summary>

### Authentication Errors
```
Error: Authentication Failed / Invalid API Key
```
**Solutions:**
- ✅ Verify API key is correctly copied
- ✅ Ensure H2H upgrade is approved
- ✅ Check IP whitelist settings
- ✅ Contact Atlantic support if persistent

### Connection Issues
```
Error: Connection timeout / Network error
```
**Solutions:**
- ✅ Check internet connection
- ✅ Verify server firewall settings
- ✅ Test API endpoint manually
- ✅ Review Atlantic service status

### Bot Not Responding
```
Bot receives messages but doesn't respond
```
**Solutions:**
- ✅ Check WhatsApp Web connection
- ✅ Verify bot configuration
- ✅ Review console logs
- ✅ Restart bot service

</details>

---

## 🤝 Support & Community

<div align="center">

### Get Help & Stay Connected

<table>
<tr>
<td align="center">
<strong>📧 Developer Email</strong><br>
<a href="mailto:wiraliwirya@gmail.com">wiraliwirya@gmail.com</a>
</td>
<td align="center">
<strong>💬 WhatsApp Community</strong><br>
<a href="https://whatsapp.com/channel/0029VadHRVCEQIagiLHVJV0d">Join Channel</a>
</td>
<td align="center">
<strong>🐛 Bug Reports</strong><br>
<a href="https://github.com/Liwirya/Mahiru-PPOB/issues">GitHub Issues</a>
</td>
</tr>
</table>

</div>

---

## 📊 Project Stats

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/Liwirya/Mahiru-PPOB?style=social)
![GitHub forks](https://img.shields.io/github/forks/Liwirya/Mahiru-PPOB?style=social)
![GitHub issues](https://img.shields.io/github/issues/Liwirya/Mahiru-PPOB?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/Liwirya/Mahiru-PPOB?style=flat-square)

</div>

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Atlantic PPOB** for providing the H2H API service
- **WhatsApp** for the messaging platform
- **Node.js Community** for the amazing ecosystem
- **All contributors** who help improve this project

---

<div align="center">

### 💝 Made with Love

**Created by [Liwirya x Mahiru](https://github.com/Liwirya) © 2025**

*Empowering businesses with automated PPOB solutions*

---

**⭐ Star this repository if you find it helpful!**

</div>

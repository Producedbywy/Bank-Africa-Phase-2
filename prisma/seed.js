import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient()

async function main() {
  // Create a demo user for Lumo
  try {
    const hashedPassword = await bcrypt.hash('demo123', 12);
    console.log("Hashed password for demo user:", hashedPassword);

    const demoUser = await prisma.user.upsert({
      where: {
        email: 'demo@lumo.finance',
      },
      update: {},
      create: {
        email: 'demo@lumo.finance',
        password: hashedPassword,
        name: 'Demo User',
        wallets: {
          create: [
            {
              currency: 'GHS',
              balance: 5000,
              isDefault: true,
            },
            {
              currency: 'USD',
              balance: 1250.75,
              isDefault: false,
            },
            {
              currency: 'EUR',
              balance: 890.30,
              isDefault: false,
            },
            {
              currency: 'GBP',
              balance: 650.20,
              isDefault: false,
            },
          ],
        },
        virtualCards: {
          create: [
            {
              cardNumber: '4111111111111234',
              expiryMonth: 12,
              expiryYear: 25,
              cvv: '123',
              status: 'active',
              currency: 'GHS',
              spendingLimit: 2500,
            },
          ],
        },
        transactions: {
          create: [
            {
              type: 'mobile-money',
              amount: 500,
              currency: 'GHS',
              status: 'completed',
              description: 'Mobile money deposit',
              provider: 'MTN Mobile Money',
            },
            {
              type: 'bill-payment',
              amount: -100,
              currency: 'GHS',
              status: 'completed',
              description: 'Electricity Bill Payment',
            },
            {
              type: 'transfer',
              amount: -250,
              currency: 'GHS',
              status: 'completed',
              description: 'Send to Family',
            },
          ],
        },
        mobileAccounts: {
          create: [
            {
              provider: 'MTN Mobile Money',
              phoneNumber: '+233501234567',
              accountName: 'Demo Account',
              isVerified: true,
            },
          ],
        },
      },
      include: {
        wallets: true,
        virtualCards: true,
        transactions: true,
        mobileAccounts: true,
      },
    })
    console.log('Demo user created:', demoUser)
    demoUser.password = hashedPassword;
  } catch (error) {
    console.error('Error creating demo user:', error)
  }

  // Create a test user
  try {
    const hashedPassword = await bcrypt.hash('test123', 12);
    console.log("Hashed password for test user:", hashedPassword);

    const testUser = await prisma.user.upsert({
      where: {
        email: 'test@example.com',
      },
      update: {
        password: hashedPassword,
      },
      create: {
        email: 'test@example.com',
        password: hashedPassword,
        name: 'Test User',
        wallets: {
          create: [
            {
              currency: 'USD',
              balance: 1000,
              isDefault: true,
            },
            {
              currency: 'EUR',
              balance: 850,
              isDefault: false,
            },
            {
              currency: 'GBP',
              balance: 750,
            },
          ],
        },
        virtualCards: {
          create: [
            {
              cardNumber: '4111111111111111',
              expiryMonth: 12,
              expiryYear: 25,
              cvv: '123',
              status: 'active',
              currency: 'USD',
              spendingLimit: 1000,
            },
          ],
        },
        transactions: {
          create: [
            {
              type: 'mobile-money',
              amount: 100,
              currency: 'USD',
              status: 'completed',
              description: 'Mobile money top up',
            },
            {
              type: 'virtual-card',
              amount: -15.99,
              currency: 'USD',
              status: 'completed',
              description: 'Netflix Subscription',
            },
            {
              type: 'transfer',
              amount: -50,
              currency: 'EUR',
              status: 'completed',
              description: 'Currency Exchange',
            },
          ],
        },
        mobileAccounts: {
          create: [
            {
              provider: 'M-Pesa',
              phoneNumber: '+254712345678',
              accountName: 'Test Account',
              isVerified: true,
            },
          ],
        },
      },
      include: {
        wallets: true,
        virtualCards: true,
        transactions: true,
        mobileAccounts: true,
      },
    })
    console.log('Test user created:', testUser)
    testUser.password = hashedPassword;
  } catch (error) {
    console.error('Error creating test user:', error)
  }

  console.log('Seed data created:')
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

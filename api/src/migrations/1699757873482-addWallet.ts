import { MigrationInterface, QueryRunner } from "typeorm";

export class AddWallet1699757873482 implements MigrationInterface {
    name = 'AddWallet1699757873482'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`message\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime NOT NULL, \`createdBy\` varchar(36) NOT NULL, \`updatedAt\` datetime NULL, \`updatedBy\` varchar(36) NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`userId\` varchar(36) NOT NULL, \`content\` varchar(500) NULL, \`parentId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`wallet_chapter\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime NOT NULL, \`createdBy\` varchar(36) NOT NULL, \`updatedAt\` datetime NULL, \`updatedBy\` varchar(36) NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`userId\` varchar(36) NOT NULL, \`chapterId\` varchar(36) NOT NULL, \`price\` decimal(12,4) NOT NULL DEFAULT '0.0000', \`currency\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`wallet_history\` (\`id\` varchar(36) NOT NULL, \`createdAt\` datetime NOT NULL, \`createdBy\` varchar(36) NOT NULL, \`updatedAt\` datetime NULL, \`updatedBy\` varchar(36) NULL, \`isDeleted\` tinyint NOT NULL DEFAULT 0, \`userId\` varchar(36) NOT NULL, \`type\` varchar(50) NOT NULL DEFAULT 'Deposit', \`content\` text NULL, \`amount\` decimal(12,4) NOT NULL DEFAULT '0.0000', \`currency\` varchar(50) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`amount\` decimal(12,4) NOT NULL DEFAULT '0.0000'`);
        await queryRunner.query(`ALTER TABLE \`chapter\` ADD \`price\` decimal(12,4) NOT NULL DEFAULT '0.0000'`);
        await queryRunner.query(`ALTER TABLE \`chapter\` ADD \`currency\` varchar(50) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_446251f8ceb2132af01b68eb593\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`message\` ADD CONSTRAINT \`FK_b1c0c3e14d1a8be95531f29eb70\` FOREIGN KEY (\`parentId\`) REFERENCES \`message\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`wallet_chapter\` ADD CONSTRAINT \`FK_27f57f64d1080382ecbe20db11d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`wallet_chapter\` ADD CONSTRAINT \`FK_43262d75d8ec47d66a1db1ea910\` FOREIGN KEY (\`chapterId\`) REFERENCES \`chapter\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`wallet_history\` ADD CONSTRAINT \`FK_b1dad46c828740b561c549fb1fc\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`wallet_history\` DROP FOREIGN KEY \`FK_b1dad46c828740b561c549fb1fc\``);
        await queryRunner.query(`ALTER TABLE \`wallet_chapter\` DROP FOREIGN KEY \`FK_43262d75d8ec47d66a1db1ea910\``);
        await queryRunner.query(`ALTER TABLE \`wallet_chapter\` DROP FOREIGN KEY \`FK_27f57f64d1080382ecbe20db11d\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_b1c0c3e14d1a8be95531f29eb70\``);
        await queryRunner.query(`ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_446251f8ceb2132af01b68eb593\``);
        await queryRunner.query(`ALTER TABLE \`chapter\` DROP COLUMN \`currency\``);
        await queryRunner.query(`ALTER TABLE \`chapter\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`amount\``);
        await queryRunner.query(`DROP TABLE \`wallet_history\``);
        await queryRunner.query(`DROP TABLE \`wallet_chapter\``);
        await queryRunner.query(`DROP TABLE \`message\``);
    }

}

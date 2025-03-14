import prisma from "../../lib/prisma";
import { NextResponse } from 'next/server'

export async function GET(request: Request, props: { params: Promise<{ address: string }> }) {
    const params = await props.params;

    const address = decodeURIComponent(params.address).toLowerCase();

    try {
        const count = await prisma.oAT.count({
            where: {
                address: address,
                status: false
            }
        })
        console.log("address:", address)


        return NextResponse.json({ count })
    } catch (error) {
        console.error('Database error:', error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}


export async function POST(request: Request, props: { params: Promise<{ address: string }> }) {
    const params = await props.params;
    const decodedAddress = decodeURIComponent(params.address).toLowerCase();


    try {
        // 更新地址的状态为 true
        const updatedRecord = await prisma.oAT.updateMany({
            where: {
                address: decodedAddress,
                // status: false // 仅更新当前状态为 false 的记录
            },
            data: {
                status: true // 将状态设置为 true
            }
        });

        if (updatedRecord.count === 0) {
            return NextResponse.json(
                { message: 'No records updated, status was already true or not found.' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Status updated successfully.' });
    } catch (error) {
        console.error('Database error:', error)
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        )
    }
}
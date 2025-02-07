'use client'

import React from 'react';
import Activity from '@/app/components/Cycle/Activity';
import { useParams } from 'next/navigation';
import { useAction } from '@/app/lib/context/ActionContext'
import Navbar from '@/app/components/Navbar/navbar';
import Invite from '@/app/components/Wallet/Invite';
import { useWallet } from '@/app/lib/context/WalletContext';
const ProjectPage = () => {
    const { projectId } = useParams();
    const { isInvited } = useWallet();

    if (projectId) {
        const value = Number(projectId)
        return (
            <div>
                <main className="bg-[#051610] px-[10px] sm:px-[100px] md:px-[120px] lg:px-[160px] xl:px-[224px] py-[20px] sm:py-[25px] md:py-[30px] lg:py-[35px] xl:py -[40px] min-h-[100vh]">
                    <Navbar />
                    {
                        isInvited ? (
                            <Invite />) : (<Activity joinId={value} />)
                    }

                </main>
                <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                </footer>
            </div>
        );
    }
};

export default ProjectPage;